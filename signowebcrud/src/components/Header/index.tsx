import { Button, Flex, Image, Stack, Text } from '@chakra-ui/react';

interface HeaderProps {
  onOpenSurveyModal: () => void;

}

export function Header({ onOpenSurveyModal }: HeaderProps) {
  return (
    <Flex
      w="100vw"
      h="200px"
      bgColor="red.100"
      alignItems="center"
      justify="space-between"
    >
      <Image mx="auto" boxSize={["100px", "200px", "250px"]} color="white" src="/logo.svg" alt="Logo da SignoWeb" />
      <Text mx="auto" fontSize={["md", "2xl", "4xl"]} color="white" fontWeight="bold">VOTING SYSTEM</Text>
      <Button mx="auto" background="#FFFFFF" fontSize={["8px", "16px", "24px"]} textColor="red.100" height={["30px", "50px", "80px"]} width={["80px", "150px", "250px"]} onClick={onOpenSurveyModal}>Nova enquete</Button>
    </Flex>
  )
}