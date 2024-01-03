import React, { useEffect, useState } from 'react';
import './modalWindowInput.scss'

function fileToBase64(file, callback) {
  if (!file) {
    console.error("No file provided for conversion.");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    if (reader.readyState === FileReader.DONE) { // Ensures the read is complete
      if (typeof callback === 'function') {
        callback(reader.result);
      }
    }
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}

const Modal = ({ onClose, inputs, onSubmit, exValues }) => {
  const [values, setValues] = useState(exValues || {});
  
  useEffect(() => {
    const hasListInput = inputs.some((x) => x.name == 'list');
    const hasTabsInput = inputs.some((x) => x.name == 'tabs');
    const hasTabsGlossaryInput = inputs.some((x) => x.name == 'tabsGlossary');
    const hasTabsDataInput = inputs.some((x) => x.name == 'tabsData');

    const hasTableInput = inputs.some((x) => x.name === 'rows');

    if (hasListInput) {
      // Update the 'list' property in the values state to an empty string
      setValues((prevValues) => ({
        ...prevValues,
        'list': exValues?.list || [],
      }));
    } else if (hasTableInput) {
      setValues((prevValues) => ({
        ...prevValues,
        'rows': exValues?.rows || [],
      }));
    } else if (hasTabsInput && hasTabsGlossaryInput) {
      const isTabsGlossaryObject = exValues?.tabsGlossary && typeof exValues.tabsGlossary === 'object' && !Array.isArray(exValues.tabsGlossary);

      let newTabsGlossary = [];
      if (isTabsGlossaryObject) {
          // Convert the tabsGlossary object to an array of its values
          newTabsGlossary = Object.values(exValues.tabsGlossary);
      } else {
          // Use the tabsGlossary array as is
          newTabsGlossary = exValues?.tabsGlossary || [];
      }

      // console.log(newTabsGlossary)


      setValues((prevValues) => ({
          ...prevValues,
          'tabs': exValues?.tabs || [],
          'tabsGlossary': newTabsGlossary,
      }));
    } else if (hasTabsInput && hasTabsDataInput) {
      // Convert tabs back into array of objects with ids
      const newTabs = exValues?.tabs?.map((tab, index) => ({
        id: tab + '-' + index, // Example id generation, adjust as needed
        tab: tab
      })) || [];

      // Remove tabName from tabsData and adjust tabsIndex to match newTabs ids
      const newTabsData = exValues?.tabsData?.map(tabData => {
          const tabNameIndex = newTabs.findIndex(tab => tab.tab === tabData.tabName);
          const newTabsIndex = tabNameIndex !== -1 ? newTabs[tabNameIndex].id : null;
          const { tabName, ...rest } = tabData;
          return { ...rest, tabsIndex: newTabsIndex };
      }) || [];

      setValues((prevValues) => ({
          ...prevValues,
          tabs: newTabs,
          tabsData: newTabsData,
      }));
    }
  }, [inputs])

  const handleAddToList = (...args) => {
    // console.log(args)
    if (args.length == 1) {
      if (args[0] == 'tabs') {
        setValues((prevValues) => ({
          ...prevValues,
          [args[0]]: [...prevValues[args[0]], 'Новый текст'],
          'tabsGlossary': [...prevValues['tabsGlossary'], 'Новый раздел']
        }));
      } else if (args[0] == 'dropd') {
        setValues((prevValues) => {
          const newTabsId = Date.now() + '-' + prevValues.tabs.length;
          const newId = Date.now() + '-' + prevValues.tabsData.length;
          return {
            ...prevValues,
            'tabs': [...prevValues['tabs'], {'id': newTabsId, 'tab': 'Вкладка ' + (values.tabs.length + 1)}],
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': newTabsId }]
          }
        });
      } else if (Number.isInteger(args[0]))  {
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[0] }]
          }
        });
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [args[0]]: [...prevValues[args[0]], 'Новый элемент'],
        }));
      }
    } else if (args.length == 2) {
      if (args[0] == 'tabsData') {
        // console.log(args[1])
        // console.log(values)
        setValues((prevValues) => {
          const newId = Date.now() + '-' + prevValues.tabsData.length;
          return {
            ...prevValues,
            'tabsData': [...prevValues['tabsData'], {'id': newId, 'header': 'Заголовок вкладки', 'data': 'Данные вкладки', 'tabsIndex': args[1] }]
          }
        });
      }
    }
  };

  const handleAddToTable = (name) => {
    if (name == 'rows') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: [...prevValues[name], {"first": '1', "second": 'Значение'}],
      }));
    }
    // Add a new element to the list array
  };
  // For lists
  const handleInputChange = (idOrIndex, newValue, name) => {
    if (name === 'tabsDataHeader' || name === 'tabsDataData') {
      setValues((prevValues) => {
        // Clone the tabsData array and update the relevant item
        const updatedTabsData = prevValues.tabsData.map(item => {
            if (item.id === idOrIndex) {
                return { ...item, [name === 'tabsDataHeader' ? 'header' : 'data']: newValue };
            }
            return item;
        });

        // Filter out items where both header and data are empty
        const filteredTabsData = updatedTabsData.filter(item => 
            item.header.trim() !== '' || item.data.trim() !== ''
        );
        // Filter the tabs array to remove tabs without corresponding tabsData
        const filteredTabs = prevValues.tabs.filter((tab, tabIndex) =>
            filteredTabsData.some(tabData => tabData.tabsIndex === tab.id)
        );

        // Return the updated state
        return {
          ...prevValues,
          tabs: filteredTabs,
          tabsData: filteredTabsData,
        };
      });
    } else if (name === 'tabs') {
      setValues((prevValues) => {
          const updatedTabs = prevValues[name].map(tab => 
              tab.id === idOrIndex ? { ...tab, tab: newValue } : tab
          );

          // Check for duplicates in the updated tabs array
          const duplicates = updatedTabs.some((tab, index, self) => 
              tab.tab === newValue && self.findIndex(t => t.tab === newValue) !== index
          );

          if (duplicates) {
              alert('Duplicate entry detected. Each tab must have a unique name.');
              return prevValues; // Return previous state to avoid applying the duplicate
          }

          return {
              ...prevValues,
              [name]: updatedTabs,
          };
      });
    } else if (name == 'tabs-for-glossary') {
      setValues((prevValues) => {
        const updatedTabs = [...prevValues.tabs];
        const updatedTabsGlossary = [...prevValues.tabsGlossary];

        if (newValue.trim() === '') {
            // Check if the corresponding tabsGlossary entry is also empty
            if (updatedTabsGlossary[idOrIndex].trim() === '') {
                // Remove both entries
                updatedTabs.splice(idOrIndex, 1);
                updatedTabsGlossary.splice(idOrIndex, 1);
            }
        } else {
            // Update the tab's value
            updatedTabs[idOrIndex] = newValue;
        }

        return {
            ...prevValues,
            tabs: updatedTabs,
            tabsGlossary: updatedTabsGlossary
        };
      });
    } else {
      const updatedList = [...values[name]];
      updatedList[idOrIndex] = newValue;
  
      setValues((prevValues) => ({
        ...prevValues,
        [name]: updatedList,
      }));
    }
  };
  //For [{firts: , second: }] List
  const handleInputChangeTable1 = (index, newValue, name) => {
    // Update the value at the specified index in the list array
    const updatedList = [...values.rows];
    if (name == 'first') {
      updatedList[index].first = newValue;
    } else {
      updatedList[index].second = newValue;
    }

    setValues((prevValues) => ({
      ...prevValues,
      'rows': updatedList,
    }));
  };
  //For default inputs (singular, simple types)
  const handleChange = (name, value, type) => {
    if (type == "file") {
      if (value) {
        const selectedFile = value;
      
        fileToBase64(selectedFile, (base64String) => {
          setValues((prevValues) => ({ ...prevValues, [name]: base64String }));
        });
        
      } else {
        console.error("Invalid file type");
      }
    } else if (type == "number") {
      const numericValue = value.replace(/\D/g, '');
      const integerValue = parseInt(numericValue, 10);

      if (!isNaN(integerValue)) {
        setValues((prevValues) => ({ ...prevValues, [name]: integerValue }));
      } else {
        console.error("Invalid numeric input");
      }
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = () => {
    const updatedValues = { ...values };

    if (updatedValues.tabsGlossary && updatedValues.tabs) {
      const tabsGlossaryObject = updatedValues.tabsGlossary.reduce((obj, glossaryValue, index) => {
          const tabKey = updatedValues.tabs[index]; // Get corresponding element from 'tabs'
          obj[tabKey] = glossaryValue; // Assign it as a key-value pair
          return obj;
      }, {});

      updatedValues.tabsGlossary = tabsGlossaryObject;
    } else if (updatedValues.tabs && updatedValues.tabsData) {
      // Transform 'tabs' into an array of tab names (strings)
      updatedValues.tabs = updatedValues.tabs.map(tab => tab.tab);

      // Map through 'tabsData' to add 'tabName' and remove 'id' and 'tabsIndex'
      const updatedTabsData = updatedValues.tabsData.map(tabData => {
          // Find the corresponding tab using tabsIndex
          const correspondingTabIndex = updatedValues.tabs.findIndex(tab => tab === tabData.tabName);
          // Add tabName to tabData and remove 'id' and 'tabsIndex'
          const { id, tabsIndex, ...rest } = tabData;
          return { ...rest, tabName: correspondingTabIndex !== -1 ? updatedValues.tabs[correspondingTabIndex] : '' };
      });

      updatedValues.tabsData = updatedTabsData;
    }
    // console.log({ inputs, values: updatedValues })

    onSubmit({ inputs, values: updatedValues });    
    setValues({});
    onClose();
  };

  return (
    <div className="modal">
        <a className='modal-title'>Введите данные для компонента</a>
        <div className="modal-content">
            {inputs.map((input) => (
              input.type == "file" ?
                <div key={input.name} className='file-input'>
                    <label>{input.label}</label>
                    <input
                        type={input.type}
                        src={values[input.name]}
                        onChange={(e) => handleChange(input.name, e.target.files[0], input.type)}
                    />
                </div>
              : input.type == "number" ?
                <div key={input.name} className='number-input'>
                    <label>{input.label}</label>
                    <input
                        type={input.type}
                        value={values[input.name] || 18}
                        onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                    />
                </div>
              : input.type == 'list' && values[input.name] ? 
                <div key={input.name} className='list-inputs'>
                  <label>{input.label}</label>
                    <div className='list-column'>
                    {values[input.name].map((x, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="text"
                            value={x || ''}
                            onChange={(e) => handleInputChange(index, e.target.value, input.name)}
                            />
                        </div>
                      )
                    })}
                    </div>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList(input.name)}>Добавить</button>
                    </div>
                </div>
              : input.type == 'rows' && values[input.name] ? 
                <div key={input.name}>
                  <label>{input.label}</label>
                    {values[input.name].map((x, index) => {
                      return (
                        <div key={index} >
                          <div >
                            <input
                              type="text"
                              value={x.first || ''}
                              onChange={(e) => handleInputChangeTable1(index, e.target.value, 'first')}
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={x.second || ''}
                              onChange={(e) => handleInputChangeTable1(index, e.target.value, 'second')}
                            />
                          </div>
                        </div>
                        
                      )
                    })}
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToTable(input.name)}>Добавить</button>
                    </div>
                </div> 
                :
                input.type == 'tabs' && values.tabs && Array.isArray(values.tabsGlossary) ? 
                <div key={input.name}>
                    <label>Разделы</label>
                    <div className='columns'>
                      <div className='first-column'>
                      {values.tabs.map((x, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="text"
                              value={x || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'tabs-for-glossary')}
                              />
                          </div>
                        )
                      })}
                      </div>
                      <div className='second-column'>
                      {values.tabsGlossary.map((x, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="text"
                              value={x || ''}
                              onChange={(e) => handleInputChange(index, e.target.value, 'tabsGlossary')}
                              />
                          </div>
                        )
                      })}
                      </div>
                    </div>
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList(input.name)}>Добавить</button>
                    </div>
                </div> 
                : input.type == 'tabsGlossary'? 
                null
                : input.type == 'dropd' && values.tabs && values.tabsData ? 
                <div key={input.name}>
                    <label>Вкладки</label>
                      {values.tabs.map((tabObject, tabIndex) => {
                        return (
                        <div className='dropdown-columns'>
                          <div key={tabObject.id} className='dropdown-rows'>
                            <input
                                type="text"
                                value={tabObject.tab || ''}
                                onChange={(e) => handleInputChange(tabObject.id, e.target.value, 'tabs')}
                                />
                          </div>
                          <div className='dropd-content'>
                            <div className='first-column'>
                            {values.tabsData.filter(x => x.tabsIndex == tabObject.id).map((x, index) => {
                              return (
                                <div key={index}>
                                  <input
                                    type="text"
                                    value={x.header || ''}
                                    onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataHeader')}
                                    />
                                </div>
                              )
                            })}
                            </div>
                            <div className='second-column'>
                            {values.tabsData.filter(x => x.tabsIndex == tabObject.id).map((x, index) => {
                              return (
                                <div key={index}>
                                  <input
                                    type="text"
                                    value={x.data || ''}
                                    onChange={(e) => handleInputChange(x.id, e.target.value, 'tabsDataData')}
                                    />
                                </div>
                              )
                            })}
                            </div>
                          </div> 
                          <div className='add-drop'>
                            <svg className='add-drop-button' onClick={() => handleAddToList('tabsData' , tabObject.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9.4" stroke="#7E869E" stroke-opacity="0.25" stroke-width="1.2"/>
                              <path d="M10 13.3333L10 6.66666" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                              <path d="M13.3333 10L6.66659 10" stroke="#374761" stroke-width="1.2" stroke-linecap="square"/>
                            </svg>
                            {/* <button className='add-drop-button' onClick={() => handleAddToList(tabIndex)}>+</button> */}
                          </div>
                        </div>
                        )
                      })}
                    <div className='add-button-div'>
                      <button className='add-button' onClick={() => handleAddToList('dropd')}>Добавить вкладку</button>
                    </div>
                </div> 
                : input.type == 'tabsData'? 
                null 
                :
                <div key={input.name} className='default-input'>
                    <label>{input.label}</label>
                    <input
                        type={input.type}
                        value={values[input.name] || ''}
                        onChange={(e) => handleChange(input.name, e.target.value, input.type)}
                    />
                </div>
            ))}
            <div className='buttons'>
              <button className="close-button" onClick={onClose}>Закрыть</button>
              <button className="save-button" onClick={handleSubmit}>Сохранить</button>
            </div>
        </div>
    </div>
  );
};

export default Modal;
