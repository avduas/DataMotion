import '../Pipelines.css'
import Chart from './Chart'

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PipelineItem({ data }) {

    const { chartData1, chartData2 } = data;  //rewriting some things

    ///////////////////////////////////////////
    /*const [chartData1, setChartData1] = useState()
    const [chartData2, setChartData2] = useState()
    useEffect(() => {
        setChartData1(data.chartData1)
        setChartData2(data.chartData2)
        try{
            chartData1.datasets[0].fill = {
            target: "origin",
            above: gradient
            }
            chartData2.datasets[0].fill = {
            target: "origin",
            above: gradient
            }
        }catch{console.log('err')}
    }, [data])*/

    ////////////////////////////
    console.log(data)
    console.log(chartData1)
    ////////////////////////////
    ///////////////////////////////////////////

    const navigate = useNavigate()

    const clusterSize = {
        '0' : 'None',
        '1' : 'XL',
        '2' : 'L',
        '3' : 'M',
        '4' : 'S'
    }

    return (
        <>
            <div className='pipelineItem'>
                <div id='leftSide'>
                    <div className='leftBox' id='pipelineName'>
                        {data.name}
                    </div>

                    <div id='templateInfo'>
                        <div id='templateInfoTitle'>Template</div>
                        <div id='row'>
                            <div id='numbOfElem'>
                                <img src='/templates/Template.svg'></img>
                                <div><span>{data.elements}</span></div>
                            </div>
                            <div id='templateLink' onClick={() => navigate(`/template?id=${data.template_id}`)}>{data.template_name}</div>
                        </div>
                    </div>

                    <div id='leftBox'>
                        <div id='stats'>
                            <div id='statsTitle'>Cluster</div>
                            <div className='statBox'>
                                <div className='clusterStat'>{clusterSize[data.selectedCluster]}</div>
                                <div id='clusterLabel'>Size</div>
                            </div>
                            <div className='statBox'>
                                <div className='clusterStat' id='bytesIn'>{data.events}</div>
                                <div id='clusterLabel'>Bytes In (<span >Mb</span>)</div>
                            </div>
                            <div className='statBox'>
                                <div className='clusterStat' id='bytesOut'>{data.bytes}</div>
                                <div id='clusterLabel'>Bytes Out (<span >kb</span>)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightSide'>
                    <div className='rightBox'>
                        <div className='chartTitle'>
                            <div>Bytes In</div><div className="edge">{data.events} Mb</div>{/*<span className="out">Out </span>*/}
                        </div>
                        <div className='chartContainer'>
                            <Chart data={chartData1} />
                        </div>
                    </div>
                    <div className='rightBox'>
                        <div className='chartTitle'>
                            <div>Bytes Out</div><span className="edge1">{data.bytes} kb</span>{/*<span className="out">Out </span>*/}
                        </div>
                        <div className='chartContainer'>
                            <Chart data={chartData2} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}