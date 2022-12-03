import type { NextPage } from 'next'
import { AppNavigation } from '../../components/AppNavigation'
import { Toolbar } from '../../components/Toolbar'
import { Tab } from '@headlessui/react'

const History: NextPage = () => {
  return (
    <div className="flex flex-col absolute top-0 bottom-0 left-0 right-0 app-bg items-center gap-5 pb-8">
      <AppNavigation />
      <h1 className="uppercase text-4xl font-light text-light-green w-11/12 text-left">
        History
      </h1>
      <Toolbar className="w-11/12" />
      <Tab.Group
        as="div"
        className={'grow overflow-hidden bg-light-green rounded-lg w-11/12'}
      >
        <Tab.List as="div" className={'h-12 w-full text-lg flex'}>
          <Tab
            className={({ selected }) =>
              `basis-1/2 transition-all ${
                selected ? '' : 'bg-whiskey text-white'
              }`
            }
          >
            Table
          </Tab>
          <Tab
            className={({ selected }) =>
              `basis-1/2 transition-all ${
                selected ? '' : 'bg-whiskey text-white'
              }`
            }
          >
            Chart
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default History
