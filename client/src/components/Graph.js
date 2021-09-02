import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = React.memo( ({shortUrlList}) => {
    const [labelsXaxis, setLabelsXaxis] = useState([]);
    const [dataYaxis, setDataYaxis] = useState([]);

    useEffect(() => {
        setLabelsXaxis([]);
        setDataYaxis([]);

        shortUrlList.forEach((item)=>{
            //labelsArr.push(item.short);
            setLabelsXaxis(labelsXaxis => [...labelsXaxis, `/${item.short}`]);
            setDataYaxis(dataYaxis => [...dataYaxis, item.clicks]);
        })
 
    }, [shortUrlList])
    return (
        <div>
            <Bar 
            data={{
            labels: labelsXaxis,
            datasets:[
              {
                label:' No. of Clicks',
                data: dataYaxis,
                backgroundColor:'#395fbf'
              }
            ]
          }}
          options={{
            maintainAspectRatio:false,
            responsive:true,
            title:{
              display:true,
              text:'No. of Clicks on Individual Links'
            },
            legend:{
              display:false
            },
            scales:{
              yAxes:[{
                scaleLabel:{
                  display:true,
                  labelString:'No. of Clicks'
                }
              }],
              xAxes:[{
                scaleLabel:{
                  display:true,
                  labelString:'Short URLs'
                }
              }]
            }
          }}
        />
        </div>
    )
})

export default Graph
