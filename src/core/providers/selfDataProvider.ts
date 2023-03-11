const selfDataProvider = (dataProvider) => ({
    ...dataProvider,
    getList: async (resource, params) => {
      let data_gte = null;
      if(params.filter.data_gte){
        const piecesData = params.filter.data_gte.split('-');
        data_gte = new Date(piecesData[0], piecesData[1], piecesData[2]);
      }
  
      let data_lte = null;
      if(params.filter.data_lte){
        const piecesData = params.filter.data_lte.split('-');
        data_lte = new Date(piecesData[0], piecesData[1], piecesData[2]);
      }
  
      delete params.filter.data_gte;
      delete params.filter.data_lte;
  
      const results = await dataProvider.getList(resource, params);
  
      const filteredResults = results.data.filter(result => {
        const piecesData = result.data.split('-');
        const data = new Date(piecesData[0], piecesData[1], piecesData[2]);
        if(!data_gte && !data_lte) return true;
        if(data_gte && data_lte) return data >= data_gte && data <= data_lte ? true : false;
        if(data_gte) return data >= data_gte ? true : false;
        if(data_lte) return data <= data_lte ? true : false;
        return true;
      });
  
      return ({
        data: filteredResults,
        total: results.total
      });
    },
});

export default selfDataProvider;