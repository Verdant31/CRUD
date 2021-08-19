import { useState } from 'react';

import { Box, Button, Heading, Image, Input, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'

import Axios from "axios";
import Modal from 'react-modal';

interface SurveyModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export function SurveyModal({ isOpen, onRequestClose }: SurveyModalProps) {
  const [title, setTitle] = useState('');
  const [dataInicio, setdataInicio] = useState('');
  const [dataFinal, setdataFinal] = useState('');
  const [wasInitiated, setWasInitiated] = useState("1");

  const [option, setOption] = useState('');
  const [listOptions, setListOptions] = useState<String[]>([]);


  function handleAddToDb() {
    Axios.post('http://localhost:3001/api/insert', {
      title: title, dataInicio: dataInicio, dataFinal: dataFinal, option: listOptions, wasInitiated: wasInitiated
    }).then(() => {
      alert('sucessful insert')
    })
    setListOptions([]);
    onRequestClose();
  }

  function HandleAddOption() {
    setListOptions([...listOptions, option])
  }


  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Box as="form" display="inline-block">
        <Stack direction="column" spacing="4" >
          <Heading color="red.100" mb="2">Cadastrar enquete</Heading>
          <Text fontSize="xl">Título da enquete</Text>
          <Input value={title} onChange={event => setTitle(event.target.value)} height="55px" width="100%" />
          <Text fontSize="xl">Data de início</Text>
          <Input value={dataInicio} onChange={event => setdataInicio(event.target.value)} type="datetime-local" height="55px" placeholder="Título" />
          <Text fontSize="xl">Data de término</Text>
          <Input value={dataFinal} onChange={event => setdataFinal(event.target.value)} type="datetime-local" height="55px" placeholder="Título" />
          <Text fontSize="xl">Opções <Text as="span" fontSize="sm">(no minimo três)</Text>
          </Text>
          <Stack direction="row" align="center">
            <Input height="55px" width="100%" value={option} onChange={event => setOption(event.target.value)} ></Input>
            /
            <Button size="lg" onClick={HandleAddOption} colorScheme="red"><EditIcon h="6" w="6" /></Button>
          </Stack>
          {listOptions.map(function (item) {
            return (
              <Text ml="1" mt="3" key="">{item}</Text>
            );
          })}
          <Text fontSize="xl">Deseja iniciar a votação ao cadastra-la?</Text>
          <RadioGroup onChange={setWasInitiated} value={wasInitiated}>
            <Stack direction="row">
              <Radio value="1">Sim</Radio>
              <Radio value="0">Não</Radio>
            </Stack>
          </RadioGroup>
        </Stack>
        <Button pos="absolute" right="24px" top="24px" border="0" background="transparent" type="button" onClick={onRequestClose}>
          <Image src="/close.svg" alt="Fechar modal" />
        </Button>
        <Button size="lg" colorScheme="red" mt="8" onClick={handleAddToDb}>Cadastrar</Button>
      </Box>
    </Modal>
  )
}