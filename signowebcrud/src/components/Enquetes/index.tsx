import { Box, SimpleGrid } from '@chakra-ui/react';

import { EnquetesEA } from './EnquetesEA';
import { EnquetesF } from './EnquetesF';
import { EnquetesNI } from './EnquetesNI';


export function Enquetes() {

  return (
    <Box mt="12" width="100%" mb="30px"  >
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" justify="center" align="center">
        <EnquetesNI />
        <EnquetesEA />
        <EnquetesF />
      </SimpleGrid >
    </Box>
  )
}