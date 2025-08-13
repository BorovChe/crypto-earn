const LastUpdateTime = () => {
  const updateDate = new Date();

  const time: string = updateDate.toLocaleTimeString();

  return (
    <>
      <p>Last update:</p>
      <span>{time}</span>
    </>
  );
};

export default LastUpdateTime;
