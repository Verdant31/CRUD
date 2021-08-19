import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Enquetes } from '../components/Enquetes';
import { Header } from '../components/Header';
import { SurveyModal } from '../components/NewSurveyModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <Box>
      <Header onOpenSurveyModal={handleOpenModal} />
      <Enquetes />
      <SurveyModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </Box>
  )
}

