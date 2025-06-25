import { BasicContent, FormAvatarItem } from "~/components";
import { useUserStore } from "~/store";

import {
	ProForm,
	ProFormDigit,
	ProFormText,
	ProFormTextArea
} from "@ant-design/pro-components";
import { Form, Input } from "antd";

export default function Profile() {
	const currentUser = useUserStore();
	const getAvatarURL = () => {
		if (currentUser) {
			if (currentUser.avatar) {
				return currentUser.avatar;
			}
			const url = "https://avatar.vercel.sh/blur.svg?text=2";
			return url;
		}
		return "";
	};

	const handleFinish = async () => {
		window.$message?.success("Basic information updated successfully");
	};

	return (
		<BasicContent className="max-w-md ml-10">
			<h3>My Profile</h3>
			<ProForm
				layout="vertical"
				onFinish={handleFinish}
				initialValues={{
					...currentUser,
					avatar: getAvatarURL()
				}}
				requiredMark
			>
				<Form.Item
					name="avatar"
					label="Avatar"
					rules={[
						{
							required: true,
							message: "Please enter your nickname!"
						}
					]}
				>
					<FormAvatarItem />
				</Form.Item>
				<ProFormText
					name="username"
					label="Username"
					rules={[
						{
							required: true,
							message: "Please enter your username!"
						}
					]}
				/>
				<ProFormText
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: "Please enter your email!"
						}
					]}
				/>
				<ProFormDigit
					name="phoneNumber"
					label="Phone Number"
					rules={[
						{
							required: true,
							message: "Please enter your phone number!"
						}
					]}
				>
					<Input type="tel" allowClear />
				</ProFormDigit>
				<ProFormTextArea
					allowClear
					name="description"
					label="Bio"
					placeholder="Personal bio"
				/>
			</ProForm>
		</BasicContent>
	);
}
