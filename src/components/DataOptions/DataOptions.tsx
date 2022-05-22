import React from 'react';

interface IProps {
  title: string;
  options: { name: string; jsonData: any }[];
  selected: string;
  state: any;
}

const Option = ({ group, optionName, selected, state, options }: any) => {
  const dataOptions = options;
  const setJourneyData = state.setJourneyData;

  const handleOptionChange = (event: any) => {
    const selected = event.target.value;
    console.log('selected:', selected);

    const idx = dataOptions.findIndex((option: any) => {
      return option.name === selected;
    });
    if (idx === -1) return;
    setJourneyData(dataOptions[idx]);
  };

  return (
    <div className="option-tile">
      <input
        type="radio"
        name={group}
        value={optionName}
        checked={selected === optionName}
        onChange={handleOptionChange}
      />
      <label className="option-tile__label">{optionName}</label>
    </div>
  );
};

const DataOptions = ({ title, options, selected, state }: IProps) => {
  return (
    <div className="section-wrapper section-wrapper__options">
      <div>{title}</div>
      {options.map((option) => {
        return (
          <Option
            key={option.name}
            group={title}
            optionName={option.name}
            selected={selected}
            state={state}
            options={options}
          />
        );
      })}
    </div>
  );
};

export default DataOptions;
