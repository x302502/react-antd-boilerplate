import type { NotificationItem } from "~/layout/widgets/notification/types";
import { request } from "~/utils";

export function fetchNotifications() {
	return request.get("notifications").json<ApiResponse<NotificationItem[]>>();
}
