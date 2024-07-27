type formatDateProps = {
  date: string;
}

export const formatDate: React.FC<formatDateProps> = ({ date }) => {
  const formatDate = new Date(date);
  const year = formatDate.getFullYear();

  const month = ("0" + (formatDate.getMonth() + 1)).slice(-2);
  const day = ("0" + formatDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
  