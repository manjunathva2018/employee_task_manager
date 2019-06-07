const excel = require('node-excel-export');
 
module.exports = {
    createExcel: createExcel
}

function createExcel(){
    // You can define styles as json object
const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: 'FF00FF00'
        }
      }
    }
  };
   
  //Array of objects representing heading rows (very top)
  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2'] // <-- It can be only values
  ];
   
  //Here you specify the export structure
  const specification = {
    userName: { // <- the key should match the actual data key
      displayName: 'Employee Name', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style
      cellStyle: function(value, row) { // <- style renderer function
        // if the status is 1 then color in green else color in red
        // Notice how we use another cell value to style the current one
        return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
      },
      width: 120 // <- width in pixels
    },
    status_id: {
      displayName: 'Status',
      headerStyle: styles.headerDark,
      cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
        return (value == 1) ? 'Active' : 'Inactive';
      },
      width: '10' // <- width in chars (when the number is passed as string)
    },
    message: {
      displayName: 'Comment',
      headerStyle: styles.headerDark,
      cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
        return (value == 1) ? 'Active' : 'Inactive';
      },
      width: '10' // <- width in chars (when the number is passed as string)
    },
    submittedDate:{
      displayName: 'Submitted Date',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style
      width: 90 // <- width in pixel
    },
    stage:{
      displayName: 'Stage',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style
      width: 50 // <- width in pixels
    },
    hour1: {
      displayName: 'Hour 1',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style
      width: 200 // <- width in pixels
    },
    hour2: {
      displayName: 'Hour 2',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style
      width: 200 // <- width in pixels
    },
    hour3: {
      displayName: 'Hour 3',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style
      width: 200 // <- width in pixels
    }
  }
   
  // The data set should have the following shape (Array of Objects)
  // The order of the keys is irrelevant, it is also irrelevant if the
  // dataset contains more fields as the report is build based on the
  // specification provided above. But you should have all the fields
  // that are listed in the report specification
  const dataset = [
    {userName: 'IBM', status_id: 1,message:0,submittedDate:'',stage:'', hour1: 'some note', hour2: 'not shown',hour3: 'not shown'},
    {userName: 'HP', status_id: 0,message:1,submittedDate:'',stage:'', hour1: 'some note',hour2: 'not shown',hour3: 'not shown'},
    {userName: 'MS', status_id: 0,message:0,submittedDate:'',stage:'', hour1: 'some note', hour2: 'not shown',hour3: 'not shown'}
  ]
   
  // Define an array of merges. 1-1 = A:1
  // The merges are independent of the data.
  // A merge will overwrite all data _not_ in the top-left cell.
  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]
  
      // Create the excel report.
  // This function will return Buffer
  const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'Report', // <- Specify sheet name (optional)
        heading: heading, // <- Raw heading array (optional)
        merges: merges, // <- Merge cell ranges
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );
 return report;
}
 
