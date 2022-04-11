exports.handler = async (event) => {
  console.log('EVENT', JSON.stringify(event));

  const response = {
    statusCode: 500,
    body: JSON.stringify('Erro in default'),
  };
  return response;
};
