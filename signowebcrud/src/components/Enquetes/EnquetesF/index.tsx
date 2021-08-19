import { Box, Stack, Text, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

type Enquete = {
  id: number,
  nome: string,
  dataInicio: Date,
  dataFinal: Date,
  foiIniciada: number,
  opcoes_votos: string;
}

export function EnquetesF() {
  const [enquetesFinalizadas, setEnquetesFinalizadas] = useState<Enquete[]>();

  function handleDeleteSurvey(id: number) {
    axios.delete(`http://localhost:3001/api/delete/${id}`).then(() => {
      alert('sucessful update')
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/getenquetesf')
      .then((response) => {
        setEnquetesFinalizadas(response.data.map((enquete: Enquete) => {
          return {
            id: enquete.id,
            nome: enquete.nome,
            dataInicio: new Date(enquete.dataInicio).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
            dataFinal: new Date(enquete.dataFinal).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
            foiIniciada: enquete.foiIniciada,
            opcoes_votos: enquete.opcoes_votos
          }
        }))
      })
  }, []);
  return (
    <Box align="center" >
      <Text mb="8" fontWeight="bold" fontSize="3xl" color="red.100">Enquetes <Text as="span" color="gray.100">{"<"}finalizadas{">"}</Text></Text>
      <Box h="450px" w="320px" borderRadius="3xl" borderColor="red.100" borderWidth="4px">
        <Stack direction="column" spacing="3.5" ml="6" mt="4" align="start" borderBottomWidth="2px" borderBottomColor="gray.150" mr="6" >
          {enquetesFinalizadas?.map((enquete: Enquete) => {
            return (
              <>
                <Text mt="2" align="start" fontWeight="bold" color="red.100">Nome: <Text fontWeight="500" color="gray.100">{enquete.nome}</Text></Text>
                <Text mt="2" align="start" fontWeight="bold" color="red.100">Início: <Text fontWeight="500" color="gray.100">{enquete.dataInicio}</Text></Text>
                <Text mt="2" align="start" fontWeight="bold" color="red.100">Término: <Text fontWeight="500" color="gray.100">{enquete.dataFinal}</Text></Text>
                <Text mt="2" align="start" fontWeight="bold" color="red.100">Votos: <Text fontWeight="500" color="gray.100">{enquete.opcoes_votos}</Text></Text>
                <Button size="md" colorScheme="red" onClick={() => { handleDeleteSurvey(enquete.id) }}><DeleteIcon h="6" w="6" /></Button>
                <br></br>
              </>
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}