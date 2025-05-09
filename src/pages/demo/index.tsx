import { BasicContent } from "#src/components";
import {
	Alert,
	Button,
	Card,
	Col,
	Divider,
	Row,
	Space,
	Tag,
	theme,
	Typography
} from "antd";
import { useTranslation } from "react-i18next";
import { demoItems } from "./constants";

const { Title, Paragraph, Text } = Typography;

export default function Demo() {
	const { t } = useTranslation();
	const {
		token: { colorBgLayout }
	} = theme.useToken();

	return (
		<BasicContent>
			<Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
				<Col span={24}>
					<Card title={t("demo.title")}>
						<Typography>
							<Title level={2}>{t("demo.welcome")}</Title>
							<Paragraph>{t("demo.description")}</Paragraph>
							<Divider />
							<Title level={3}>{t("demo.features")}</Title>
							<Space direction="vertical" style={{ width: "100%" }}>
								{demoItems.map((item) => (
									<Card key={item.key} size="small">
										<Space>
											<Tag color={item.color}>{item.tag}</Tag>
											<Text strong>{item.title}</Text>
										</Space>
										<Paragraph style={{ marginTop: 8 }}>
											{item.description}
										</Paragraph>
									</Card>
								))}
							</Space>
							<Divider />
							<Alert
								message={t("demo.infoTitle")}
								description={t("demo.infoDescription")}
								type="info"
								showIcon
								style={{ marginBottom: 16 }}
							/>
							<Row justify="center">
								<Space>
									<Button type="primary">{t("demo.primaryButton")}</Button>
									<Button>{t("demo.secondaryButton")}</Button>
								</Space>
							</Row>
						</Typography>
					</Card>
				</Col>
			</Row>
		</BasicContent>
	);
}
