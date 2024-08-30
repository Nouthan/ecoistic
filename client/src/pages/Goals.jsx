import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import { Listbox, Transition, ListboxButton, ListboxOptions, ListboxOption, Input } from '@headlessui/react';
import { HiSelector } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useCreateGoalMutation, useGetGoalDataQuery } from "../redux/slices/api/taskApiSlice"

const difficultyLevels = [
  "Reduce by 10%",
  "Reduce by 15%",
  "Reduce by 20%",
];
const timeFrames = [
  "Weekly",
  "Monthly",
  "Yearly",
];
const appliances = [
  "Air Conditioner",
  "Water Heater",
  "Refrigerator",
  "Washing Machine",
  "Dryer",
  "Dishwasher",
  "Oven",
  "Microwave",
  "Other"
];
const units = [
  "kWh",
  "CO2",
  "Cost"
];

const Goals = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [impact, setImpact] = useState(0);
  const [createGoal] = useCreateGoalMutation();
  const { data: goal, isLoading } = useGetGoalDataQuery();

  const onSubmit = async (data) => {
    let reductionPercentage;
    switch (data.difficulty) {
      case "Reduce by 10%":
        reductionPercentage = 60;
        break;
      case "Reduce by 15%":
        reductionPercentage = 70;
        break;
      case "Reduce by 20%":
        reductionPercentage = 85;
        break;
      default:
        reductionPercentage = 50;
    }
  
    const estimatedImpact = (Math.random() * reductionPercentage + 20).toFixed(2);
    setImpact(Number(estimatedImpact));
    const coins = (Math.random() * (500 - 100) + 100).toFixed(2);
    try {
      await createGoal({
        name: data.name,
        difficulty: data.difficulty,
        appliance: data.appliance,
        timeFrame: data.timeFrame,
        unit: data.unit,
        coins: Number(coins),
      }).unwrap();
  
      reset({
        name: '',
        difficulty: difficultyLevels[0],
        appliance: appliances[0],
        timeFrame: timeFrames[0],
        unit: units[0],
      });
      setImpact(0);
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };
  

  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevels[0]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0]);
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [selectedAppliance, setSelectedAppliance] = useState(appliances[0]);

  if (isLoading) return (<div>Loading...</div>)
  const goalData = {
    labels: ["Goals Completed", "Goals Pending"],
    datasets: [
      {
        label: 'Number of Goals',
        data: [goal.completedGoalsCount, goal.pendingGoalsCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full py-3">
      <h1 className="text-center underline font-bold text-xl md:text-3xl mb-4">Goal Setting</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 h-screen">
        <div className="container border-2 border-gray-500 rounded-md p-4 md:w-[70%] w-full h-fit py-8 overflow-x-scroll justify-self-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center mb-4">
              <label className="text-gray-700 font-bold mb-2">Goal Name</label>
              <Input
                className="w-full md:w-[70%] border border-gray-300 rounded-md p-2"
                {...register("name", { required: true })}
                placeholder="Enter your goal name"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-1 flex-col gap-2 px-3">
                <div>
                  <label>Difficulty Level</label>
                  <Listbox
                    value={selectedDifficulty}
                    onChange={(value) => {
                      setSelectedDifficulty(value);
                      setValue("difficulty", value);
                    }}
                  >
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative">
                          <ListboxButton className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selectedDifficulty}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </ListboxButton>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {difficultyLevels.map((level) => (
                                <ListboxOption
                                  key={level}
                                  className={({ active }) =>
                                    `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={level}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {level}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                <div>
                  <label>Appliance</label>
                  <Listbox
                    value={selectedAppliance}
                    onChange={(value) => {
                      setSelectedAppliance(value);
                      setValue("appliance", value);
                    }}
                  >
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative">
                          <ListboxButton className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selectedAppliance}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </ListboxButton>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {appliances.map((appliance) => (
                                <ListboxOption
                                  key={appliance}
                                  className={({ focus }) =>
                                    `${focus ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={appliance}
                                >
                                  {({ selected, focus }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {appliance}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${focus ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-3">
                <div>
                  <label>Time Frame</label>
                  <Listbox
                    value={selectedTimeFrame}
                    onChange={(value) => {
                      setSelectedTimeFrame(value);
                      setValue("timeFrame", value);
                    }}
                  >
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative">
                          <ListboxButton className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selectedTimeFrame}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </ListboxButton>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {timeFrames.map((frame) => (
                                <ListboxOption
                                  key={frame}
                                  className={({ active }) =>
                                    `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={frame}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {frame}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                <div>
                  <label>Unit</label>
                  <Listbox
                    value={selectedUnit}
                    onChange={(value) => {
                      setSelectedUnit(value);
                      setValue("unit", value);
                    }}
                  >
                    {({ open }) => (
                      <>
                        <div className="mt-1 relative">
                          <ListboxButton className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selectedUnit}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </ListboxButton>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {units.map((unit) => (
                                <ListboxOption
                                  key={unit}
                                  className={({ active }) =>
                                    `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                                    cursor-default select-none relative py-2 pl-3 pr-9`
                                  }
                                  value={unit}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                                        {unit}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${active ? 'text-white' : 'text-indigo-600'}
                                          absolute inset-y-0 right-0 flex items-center pr-4`}
                                        >
                                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className='flex flex-row w-full items-center justify-center gap-2 ml-3'>
                <label className="block text-gray-700 bg-gray-300 rounded-md p-2 text-center mt-2 w-fit">Estimated Impact</label>
                <div className="relative pt-1 w-[80%] px-2">
                  <div className="flex mb-2 items-center justify-between text-xs font-semibold text-gray-600">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                  <div className="relative flex flex-col">
                    <div className="flex flex-col">
                      <div className="relative flex-1 flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${impact}%` }}
                          ></div>
                        </div>
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                          {impact}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="bg-violet-500 text-white rounded-md px-6 py-2 ml-3 mt-3 w-fit">Generate Impact & Create Goal</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-1/2 md:h-1/4">
          <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-center w-full h-64">
            <h2 className="text-center underline font-bold text-lg md:text-2xl mb-4">Track Goals</h2>
            <div className="w-full h-full">
              <Bar data={goalData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col justify-center items-center w-full h-full">
            <h2 className="text-center underline font-bold text-lg md:text-2xl mb-4">Community Challenges</h2>
            <p className="text-center mb-4 w-[80%]">
              Compete, collaborate, and conquer energy waste with Community Challenges.
            </p>
            <Link to="/community" className="text-blue-700 bg-gray-300 p-2 rounded-md">Learn more</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Goals;
