const convertMinutesToReadableString = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  let readableString = '';

  if (hours > 0) {
    readableString += `${hours}hr `;
  }
  if (mins > 0) {
    readableString += `${mins}min`;
  }

  return readableString.trim();
};

const formatInstructions = (instructions: string): string[] => {
  return (
    instructions
      ?.replace('<ol><li>', '')
      ?.replace('</li></ol>', '')
      ?.split('</li><li>') ?? []
  );
};

const concatStringArray = (array: string[]): string => {
  console.log(array);
  return array?.join(' . ') ?? '';
};

export const Utility = {
  convertMinutesToReadableString,
  formatInstructions,
  concatStringArray
};
