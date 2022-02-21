import { Box, Text } from "@mantine/core";

interface IHeaderProps {
  title: string;
}

export default function AppHeader(props: IHeaderProps) {
  return (
    <Box sx={{ m: 2 }}>
      <header>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
          style={{
            fontFamily: "Greycliff CF, sans-serif",
            textTransform: "uppercase",
          }}
        >
          {props.title}
        </Text>
      </header>
    </Box>
  );
}
