import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateDesignCon } from '../scripts/templateDesign';
import { pipelineFetchObj } from '../scripts/pipelines';
import './NewPipeline.css';

export default function NewPipeline() {
    const [templates, setTemplates] = useState([]);
    const [PipelineName, setSelectedPipelineName] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedTemplateName, setSelectedTemplateName] = useState('');
    const [selectedDataRoute, setSelectedDataRoute] = useState('1');
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCluster, setSelectedCluster] = useState('');
    const [inputError, setInputError] = useState(false);


    const [option, setOption] = useState('SQLDATABASE');
    const [server, setServer] = useState('');
    const [port, setPort] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [databaseName, setDatabaseName] = useState('');
    const [tableName, setTableName] = useState('');
    const [basePath, setBasePath] = useState('');
    const [protocolHTTP, setProtocolHTTP] = useState('');
    const [API, setAPI] = useState('');
    const [bucket, setBucket] = useState('');
    const [path, setPath] = useState('');
    const [region, setRegion] = useState('');
    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');

    const collectDataToSend = () => {
        return {
            PipelineName,
            selectedTemplate,
            selectedDataRoute,
            selectedCluster,
        };
    };

    const sendDataToServer = async () => {
        const data = collectDataToSend();

        console.log('Sending data to server:', JSON.stringify(data, null, 2));

        const response = await pipelineFetchObj.create(data);
        if (response) {
            console.log('Pipeline data sent successfully:', response);
        } else {
            console.error('Error sending pipeline data');
        }
        navigate('/pipelines')
    };

    //add id

    const navigate = useNavigate()

    const handleDataRouteSelection = (route_source, id) => {
        console.log('Selected Route Source:', route_source);
        console.log('Selected Route ID:', id);
        setOption(route_source);
        setSelectedDataRoute(id);
    };

    const dataRoutes = [
        { id: '1', img: '/dataRoutes/itemIcons/SQLStorage.png', route_source: 'SQLDATABASE', name: 'SQL Database' },
        { id: '2', img: '/dataRoutes/itemIcons/APIGateway.png', route_source: 'APIGATEWAY', name: 'API Gateway' },
        { id: '3', img: '/dataRoutes/itemIcons/FileSystem.png', route_source: 'FILESYSTEM', name: 'File System' },
        { id: '4', img: '/dataRoutes/itemIcons/GCS.png', route_source: 'GCS', name: 'Google Cloud Storage' },
        { id: '5', img: '/dataRoutes/itemIcons/AWS.png', route_source: 'AWS', name: 'Amazon Web Services' }
    ];

    const inputDisplay = {
        "SQLDATABASE": { host: true, user: true, password: true, databaseName: true, tableName: true, basePath: false, protocolHTTP: false, API: false, bucket: false, path: false, region: false, key: false, secret: false },
        "APIGATEWAY": { host: true, user: false, password: false, databaseName: false, tableName: false, basePath: true, protocolHTTP: true, API: true, bucket: false, path: false, region: false, key: false, secret: false },
        "FILESYSTEM": { host: false, user: true, password: true, databaseName: false, tableName: false, basePath: false, protocolHTTP: false, API: false, bucket: false, path: true, region: false, key: false, secret: false },
        "GCS": { host: false, user: false, password: false, databaseName: false, tableName: false, basePath: true, protocolHTTP: false, API: true, bucket: true, path: false, region: false, key: false, secret: false },
        "AWS": { host: false, user: false, password: false, databaseName: false, tableName: false, basePath: true, protocolHTTP: false, API: true, bucket: true, path: false, region: true, key: true, secret: true },
    }

    const clusters = [
        { id: '1', name: 'X-Large', ram: '2 TB', cores: '160' },
        { id: '2', name: 'Large', ram: '1 TB', cores: '80' },
        { id: '3', name: 'Medium', ram: '500 GB', cores: '40' },
        { id: '4', name: 'Small', ram: '250 GB',  cores: '20' }
    ];

    async function getTemplates() {
        try {
            const res = await templateDesignCon.getAllTemplates();
            if (Array.isArray(res) && res.length > 0) {
                setTemplates(res);
            } else {
                console.error('No templates found.');
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    }

    function dateParsing(raw) {
        const date = new Date(raw);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }

    useEffect(() => {
        console.log('Fetching templates...');
        getTemplates();
    }, []);

    useEffect(() => {
        console.log('Selected Template:', selectedTemplate);
    }, [selectedTemplate]);


    const handleSelectionAndStep = (selectionType, value) => {
        switch (selectionType) {
            case 'chooseName':
                if (value.trim() === '') {
                    setInputError(true);
                    break;
                } else {
                    setSelectedPipelineName(value);
                    setCurrentStep(1);
                    break;
                }
            case 'template':
                setSelectedTemplate(value);
                setCurrentStep(2);
                break;
            case 'dataRoute':
                setSelectedDataRoute(value);
                setCurrentStep(3);
                break;
            case 'returnToChooseName':
                setCurrentStep(0);
                break;
            case 'returnToTemplateSelection':
                setCurrentStep(1);
                break;
            case 'returnToRouteSelection':
                setCurrentStep(2);
                break;
            case 'cluster':
                setSelectedCluster(value);
                break;
            default:
                break;
        }
    };

    return (
        <div id="newPipeline">
            <div id="innerHeader">
                <p>Creating New Pipeline</p>
            </div>
            <div id='mainCont'>
                {currentStep === 0 && (
                    <div className='confirmation'>
                        <div className='history'>
                            <p>Write a name for Your Pipeline</p>
                        </div>
                        <div className='container'>
                            <input
                                type="text"
                                placeholder="Enter pipeline name"
                                name="PipelineName"
                                value={PipelineName}
                                onChange={(e) => setSelectedPipelineName(e.target.value)}
                                className={`nameInput ${inputError ? 'err' : ''}`}
                            />
                        </div>
                        {inputError && (
                            <p id='errMes'>Please enter a name for your pipeline</p>
                        )}
                        <div className='confirmDivFirst'>
                            <button
                                onClick={() => handleSelectionAndStep('chooseName', PipelineName)}
                                className='confirmButton'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className='confirmation'>
                        <div className='history'>
                            <p>Name: {PipelineName}
                                <button onClick={() => handleSelectionAndStep('returnTo')}>
                                    <img src='/templates/Edit.svg' alt="Edit"></img>
                                </button>
                            </p>
                            <p>Choose the template</p>
                        </div>
                        <div className='container'>
                            {templates.map((template) => (
                                <div
                                    key={template.template_id}
                                    className={`route ${selectedTemplate === template.template_id ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (selectedTemplate === template.template_id) {
                                            setSelectedTemplate(null);
                                            setSelectedTemplateName('');
                                        } else {
                                            setSelectedTemplate(template.template_id);
                                            setSelectedTemplateName(template.template_name);
                                        }
                                    }}
                                >
                                    <div className='cell'>{template.template_name}</div>
                                    <div className='cell'>Created at: {dateParsing(template.last_modified_at)}</div>
                                    <div className='cell'>Elements: {template.elements}</div>
                                </div>
                            ))}
                        </div>
                        <div className='confirmDiv'>
                            <button
                                onClick={() => handleSelectionAndStep('returnToChooseName')}
                                className='confirmButton'
                            >
                                Back
                            </button>
                            <button
                                onClick={() => handleSelectionAndStep('template', selectedTemplate)}
                                className='confirmButton'
                                disabled={!selectedTemplate}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className='confirmation'>
                        <div className='history'>
                            <p>Name: {PipelineName}
                                <button onClick={() => handleSelectionAndStep('returnToChooseName')}>
                                    <img src='/templates/Edit.svg' alt="Edit" />
                                </button>
                            </p>
                            <p>
                                Template: {selectedTemplateName}
                                <button onClick={() => handleSelectionAndStep('returnToTemplateSelection')}>
                                    <img src='/templates/Edit.svg' alt="Edit" />
                                </button>
                            </p>
                        </div>
                        <div id='configCont'>
                            <div id='firstStr'>
                                <p>Data Source:</p>
                            </div>
                            <div id='optCont'>
                                {dataRoutes.map((e) => (
                                    <div
                                        key={e.id}
                                        id={e.route_source}
                                        onClick={() => handleDataRouteSelection(e.route_source, e.id)}
                                        className={`option ${option === e.route_source ? 'active' : ''}`}
                                    >
                                        <img src={e.img} alt={e.name} />
                                        <div>{e.name}</div>
                                    </div>
                                ))}
                            </div>
                            {option && (
                                <div id='inputs'>
                                    {inputDisplay[option].host && (
                                        <div className='inputStr'>
                                            <div>Host:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="host"
                                                value={server}
                                                onChange={(e) => setServer(e.target.value)}
                                                className='smallInp'
                                            />
                                            <div>Port:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="port"
                                                value={port}
                                                onChange={(e) => setPort(e.target.value)}
                                                className='smallInp'
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].user && (
                                        <div className='inputStr'>
                                            <div>User:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="user"
                                                value={user}
                                                onChange={(e) => setUser(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].password && (
                                        <div className='inputStr'>
                                            <div>Password:</div>
                                            <input
                                                type="password"
                                                maxLength={50}
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].databaseName && (
                                        <div className='inputStr'>
                                            <div>Database Name:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="databaseName"
                                                value={databaseName}
                                                onChange={(e) => setDatabaseName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].tableName && (
                                        <div className='inputStr'>
                                            <div>Table Name:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="tableName"
                                                value={tableName}
                                                onChange={(e) => setTableName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].basePath && (
                                        <div className='inputStr'>
                                            <div>Base Path:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="basePath"
                                                value={basePath}
                                                onChange={(e) => setBasePath(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].protocolHTTP && (
                                        <div className='inputStr'>
                                            <div>Protocol HTTP:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="protocolHTTP"
                                                value={protocolHTTP}
                                                onChange={(e) => setProtocolHTTP(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].API && (
                                        <div className='inputStr'>
                                            <div>API:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="API"
                                                value={API}
                                                onChange={(e) => setAPI(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].bucket && (
                                        <div className='inputStr'>
                                            <div>Bucket:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="bucket"
                                                value={bucket}
                                                onChange={(e) => setBucket(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].path && (
                                        <div className='inputStr'>
                                            <div>Path:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="path"
                                                value={path}
                                                onChange={(e) => setPath(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].region && (
                                        <div className='inputStr'>
                                            <div>Region:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="region"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].key && (
                                        <div className='inputStr'>
                                            <div>Key:</div>
                                            <input
                                                type="text"
                                                maxLength={50}
                                                name="key"
                                                value={key}
                                                onChange={(e) => setKey(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {inputDisplay[option].secret && (
                                        <div className='inputStr'>
                                            <div>Secret:</div>
                                            <input
                                                type="password"
                                                maxLength={50}
                                                name="secret"
                                                value={secret}
                                                onChange={(e) => setSecret(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='confirmDiv'>
                            <button
                                onClick={() => handleSelectionAndStep('returnToTemplateSelection')}
                                className='confirmButton'
                            >
                                Back
                            </button>
                            <button
                                onClick={() => handleSelectionAndStep('dataRoute', selectedDataRoute)}
                                className='confirmButton'
                                disabled={!option}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 3 && (
                    <div className='confirmation'>
                        <div className='history'>
                            <p>Name: {PipelineName}
                                <button onClick={() => handleSelectionAndStep('returnToChooseName')}>
                                    <img src='/templates/Edit.svg' alt="Edit"></img>
                                </button>
                            </p>
                            <p>
                                Template: {selectedTemplateName}
                                <button onClick={() => handleSelectionAndStep('returnToTemplateSelection')}>
                                    <img src='/templates/Edit.svg' alt="Edit"></img>
                                </button>
                            </p>
                            <p>
                                Data Source: {option}
                                <button onClick={() => handleSelectionAndStep('returnToRouteSelection')}>
                                    <img src='/templates/Edit.svg' alt="Edit"></img>
                                </button>
                            </p>
                        </div>
                        <div className='container'>
                            {clusters.map(route => (
                                <div
                                    key={route.id}
                                    className={`cluster ${selectedCluster === route.id ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (selectedCluster === route.id) {
                                            setSelectedCluster(null);
                                        } else {
                                            setSelectedCluster(route.id);
                                        }
                                    }}
                                >
                                    <div className='cell'>{route.name}</div>
                                    <div className='cell'>{route.ram}</div>
                                    <div className='cell'>No. of Cores: {route.cores}</div>
                                </div>
                            ))}
                        </div>
                        <div className='confirmDiv'>
                            <button
                                onClick={() => handleSelectionAndStep('returnToRouteSelection')}
                                className='confirmButton'
                            >
                                Back
                            </button>
                            <button
                                disabled={!selectedCluster}
                                className='confirmButton'
                                onClick={() => sendDataToServer()}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
