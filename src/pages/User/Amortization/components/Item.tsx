import { Text } from "@mantine/core";

type ItemProps = { label: string; value: string };

export default function Item(props: ItemProps) {
  return (
    <Text>
      <span className="font-bold">{props.label}</span>
      {props.value}
    </Text>
  );
}
