import { useState } from 'react';
import StoryBook from './story/StoryBook.jsx';
import WeddingInvitation from './App.jsx';

// Primero se cuenta la historia (libro animado) y después aparece la confirmación de asistencia.
export default function Root() {
  const [showStory, setShowStory] = useState(true);

  if (showStory) {
    return (
      <StoryBook
        onFinish={() => {
          setShowStory(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return <WeddingInvitation />;
}
