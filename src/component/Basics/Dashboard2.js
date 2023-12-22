import React, { useEffect, useState } from "react";
import "./styleDashboard.css";
import Progresser from "./Progresser";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

import "./Dashboard2.css"; // Create a separate CSS file for Dashboard2 styles

const Dashboard2 = () => {
  const navigate = useNavigate();
  const navigateToOutputPage = () => {
    navigate('/OutputPage');
  };
  const [sensorData, setSensorData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileRead = (event) => {
    const content = event.target.result;

    // Now you can parse the CSV content using papaparse
    Papa.parse(content, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const arrayOfArrays = results.data.map(row => {
          return Object.entries(row).map(([title, value]) => ({
            title,
            value,
          }));
        });

        console.log('Parsed CSV data:', arrayOfArrays);
        setSensorData(arrayOfArrays);
        setFileUploaded(true);
      },
    });
  };

  const handleFileChosen = (file) => {
    const reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  };

  useEffect(() => {
    // Attach an event listener to the input element
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        handleFileChosen(selectedFile);
      }
    });

    return () => {
      // Remove the event listener when the component unmounts
      fileInput.removeEventListener('change', handleFileChosen);
    };
  }, [handleFileChosen]);

  // Filter entries based on the selected date
  const filteredSensorData = selectedDate
    ? sensorData.find(entry =>
        entry.some(item =>
          item.title === 'created_at' &&
          item.value &&
          item.value.startsWith(selectedDate)
        )
      ) || sensorData[0]
    : sensorData[0]; 

  return (
    <>
      <section >
        <div className="container" >
          {filteredSensorData ? <div className="cards" >
            {Array.isArray(filteredSensorData) ? (
              filteredSensorData.map((data, index) => (
                <div key={index} className="card" >
                  <Progresser sser sensorData={data} />
                </div>
              ))
            ) : (
              <div className="card">
                <Progresser sensorData={filteredSensorData} />
              </div>
            )}
          </div>:<div className="cards" style={{backgroundColor:"white",justifyContent:"center" ,alignItems:"center"}} ><h1 style={{fontSize:"32px"}}>Data has not been added yet. Upload the data file below and use the date picker to see data on the relevant date</h1></div>}

          <div className="bottom">
          <div  style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px' }}>
  <label htmlFor="fileInput" className="file-label" style={{ color: 'white' }}>Upload CSV File:</label>
  <input type="file" style={{color:"white"}} id="fileInput" onChange={(e) => handleFileChosen(e.target.files[0])} />
  <label htmlFor="datePicker" className="date-label" style={{ marginLeft: '20px', color: 'white' }}>Select Date:</label>
  <input
    type="date"
    id="datePicker"
    value={selectedDate}
    
    onChange={(e) => setSelectedDate(e.target.value)}
  />
</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard2;
