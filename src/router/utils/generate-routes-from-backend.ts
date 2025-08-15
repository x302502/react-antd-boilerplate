import type { AppRouteRecordRaw } from '~/router/types';
import { Iframe } from '~/components/iframe';
import { ContainerLayout } from '~/layout';
import { lazy } from 'react';
import { Outlet } from 'react-router';
import { addRouteIdByPath } from './add-route-id-by-path';

const ExceptionUnknownComponent = lazy(() => import('~/views/@core/exception/unknown-component'));

/**
 * @zh Asynchronously get page components
 * @en Async load page components
 */
const pageModules = import.meta.glob([
  '/src/views/**/*.tsx',
  // Exclude exception pages from lazy loading
  '!/src/views/exception/**/*.tsx',
]);

/**
 * @zh Generate frontend routes based on backend route configuration
 * @en Generate frontend routes based on backend route configurations
 */
export async function generateRoutesFromBackend(backendRoutes: Array<AppRouteRecordRaw>) {
  const pageModulePaths = Object.keys(pageModules);
  if (!backendRoutes?.length) {
    return [];
  }

  /**
   * @zh Dynamically load and set route components
   * @en Dynamically load and set route components
   * @param route Route configuration object
   * @param componentPath Component file path
   */
  const loadRouteComponent = async (route: AppRouteRecordRaw, componentPath: string) => {
    const modulePath = `/src/views${componentPath}/index.tsx`;
    const moduleIndex = pageModulePaths.findIndex(path => path === modulePath);

    if (moduleIndex !== -1) {
      const lazyComponent = pageModules[pageModulePaths[moduleIndex]];
      route.Component = lazy(lazyComponent as any);
    } else {
      console.warn(`[Frontend component not found]: ${componentPath}`);
      route.Component = ExceptionUnknownComponent;
    }
  };

  /**
   * Convert route configuration
   * @param route Original route configuration
   * @param parentPath Parent path (for nested routes)
   * @returns Converted route configuration
   */
  const transformRoute = async (route: AppRouteRecordRaw, parentPath?: string): Promise<AppRouteRecordRaw> => {
    const transformedRoute: AppRouteRecordRaw = {
      ...route,
      handle: {
        ...route.handle,
        backstage: true,
      },
    };

    // Handle index routes (inherit parent path)
    if (transformedRoute.index === true && parentPath) {
      await loadRouteComponent(transformedRoute, parentPath);
    }
    // Handle iframe routes
    else if (transformedRoute.handle?.iframeLink) {
      transformedRoute.Component = Iframe;
    }
    // Handle external link routes
    else if (transformedRoute.handle?.externalLink) {
      // External links don't need components
    }
    // Handle cases with child routes
    else if (transformedRoute.children?.length) {
      transformedRoute.Component = parentPath ? Outlet : ContainerLayout;
    }
    // Handle normal routes
    else {
      await loadRouteComponent(transformedRoute, transformedRoute.path!);
    }

    // Recursively process child routes
    if (transformedRoute.children?.length) {
      transformedRoute.children = await Promise.all(
        transformedRoute.children.map(child => transformRoute(child, transformedRoute.path)),
      );
    }

    return transformedRoute;
  };

  /**
   * Standardize route configuration, ensure each route has child routes
   */
  const normalizeRouteStructure = (route: AppRouteRecordRaw): AppRouteRecordRaw => {
    if (!route.children?.length) {
      return {
        ...route,
        children: [
          {
            index: true,
            handle: { ...route.handle },
          },
        ],
      } as AppRouteRecordRaw;
    }
    return route;
  };

  // Process route configuration
  const normalizedRoutes = backendRoutes.map(normalizeRouteStructure);
  const transformedRoutes = await Promise.all(normalizedRoutes.map(route => transformRoute(route)));

  return addRouteIdByPath(transformedRoutes);
}
