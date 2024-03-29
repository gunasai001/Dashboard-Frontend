import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/Dashboardbox'
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';


const Row3 = () => {

  const {palette} = useTheme();
  const pieColors = ["#076050", "#12efc8"];
  const {data: kpiData}=useGetKpisQuery();
  const {data: productData}=useGetProductsQuery();
  const {data: transactionData}=useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if(kpiData){
      const totalExpenses=kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value])=>{
          return [
            {
              name:key, 
              value: value,
            },
            {
              name:`${key} of Total`, 
              value: totalExpenses-value,
            },
          ]
        }
      )
    }
  }, [kpiData]);

  const productColoumns = [
    {
      field: "_id",
      headerName: "id",
      flex:1,
    },
    {
      field:"expense",
      headerName: "Expense",
      flex:0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field:"price",
      headerName: "Price",
      flex:0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]
  const transactionColoumns = [
    {
      field: "_id",
      headerName: "id",
      flex:1,
    },
    {
      field:"buyer",
      headerName: "Buyer",
      flex:0.67,
    },
    {
      field:"amount",
      headerName: "Amount",
      flex:0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field:"productIds",
      headerName: "Count",
      flex:0.35,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ];

  return (
    <>
        <DashboardBox  gridArea="g">
    
          <BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
          <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border:"none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-coloumnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-coloumnSeperator": {
              visibility: "hidden",
            },
          }}>
            <DataGrid 

            rowHeight={35}
            hideFooter={true}
            rows={productData || []} 
            columns={productColoumns} /> 
          </Box>
        </DashboardBox>
        <DashboardBox  gridArea="h">

        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
          <Box mt="1rem" p="0 0.5rem" height="80%" sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border:"none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-coloumnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-coloumnSeperator": {
              visibility: "hidden",
            },
          }}>
            <DataGrid 

            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []} 
            columns={transactionColoumns} /> 
          </Box>

        </DashboardBox>
        <DashboardBox  gridArea="i">
          <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
          <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center" >
            {pieChartData?.map((data, i)=>(
            <Box key={`${data[0].name}-${i}`}>       
              <PieChart width={110} height={100}
              margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
             }} >
        <Pie
          stroke="none"
          data={data}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[entry.value]} />
          ))}
        </Pie>
      </PieChart>
      <Typography alignContent="center" variant="h5">{data[0].name}</Typography>
      </Box>
      ))}
      </FlexBetween>
        </DashboardBox>
        <DashboardBox  gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" sideText="+14%" />
            <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={"#076050"} borderRadius="1rem">
              <Box height="15px" bgcolor={"#0ebfa0"} borderRadius="1rem" width="40%">

              </Box>
            </Box>
            <Typography margin="0 1rem" variant='h6'>
              With a good marketing strategy, We are able to achieve good profits and by managing resources well, we could cut some expenses
            </Typography>
        </DashboardBox>
        </>
  )
}

export default Row3;