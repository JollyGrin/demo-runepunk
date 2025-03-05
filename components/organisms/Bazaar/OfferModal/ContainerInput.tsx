import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, InputHTMLAttributes } from "react";

export const ContainerInput = (props: {
  className: "quantity" | "price";
  field: number;
  setField: (value: number) => void;
  max?: number;
}) => {
  const { query, push } = useRouter();
  const isBuy = query.offerType === "buy";

  function add() {
    if (props.max && props.field >= props.max) return;
    props.setField(props.field + 1);
  }

  function minus() {
    if (props.field <= 0) return;
    props.setField(props.field - 1);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    props.setField(Number(e.target.value ?? 0));
  }

  function setNum(value: number) {
    if (props.field <= 0) return;
    props.setField(value);
  }

  return (
    <Flex
      m="0 auto"
      w="60%"
      direction="column"
      className={props.className}
      border="solid 0"
      py="1rem"
      gap="1rem"
    >
      <HStack w="100%">
        <Button variant="ghost" onClick={add}>
          +
        </Button>
        <HStack w="100%" bg="brand.shadow" h="5rem" justifyContent="center">
          <input
            max={props.max?.toString()}
            value={props.field}
            onChange={onChange}
            type="number"
            style={{
              background: "transparent",
              border: "solid 0",
              textAlign: "center",
            }}
          />
        </HStack>
        <Button variant="ghost" onClick={minus}>
          -
        </Button>
      </HStack>
      <HStack gap="1rem" justifyContent="center">
        {[10, 25, 50, 100].map((value) => (
          <Button
            key={value + "button" + props.className}
            variant="ghost"
            border="solid 1px white"
            borderRadius="0.5rem"
            onClick={() => setNum(value)}
          >
            {value}
          </Button>
        ))}
      </HStack>
      <Text textAlign="center">
        {props.className === "quantity"
          ? "Quantity of items"
          : "Price per item"}
      </Text>
    </Flex>
  );
};
