import { Box, Button, Modal, Text } from "@mantine/core";
import { useState } from "react";


export default function ConfirmDialog({
	opened,
	onClose,
	message,
	onConfirm,
}: {
	opened: boolean;
	message: string;
	onClose: () => void;
	onConfirm: () => Promise<void>;
}) {
	const [loading, setLoading] = useState(false);
	const handleLoading = async () => {
		setLoading(true);
		await onConfirm();
		setLoading(false);
	};
	return (
		<Modal opened={opened} onClose={onClose} title="Confirmar" centered>
			<Text className="mb-1">{message}</Text>
			<Box className="place-content-between">
				<Button onClick={onClose} disabled={loading}>
					Cancelar
				</Button>
				<Button
					onClick={handleLoading}
					loading={loading}
					color="red"
				>
					Aceptar
				</Button>
			</Box>
		</Modal>
	);
}
