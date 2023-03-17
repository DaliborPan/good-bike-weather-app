import type { NextPage } from 'next'
import { Tab } from '@headlessui/react'

import { AppNavigation } from 'components/AppNavigation'
import { Toolbar } from 'components/Toolbar'

const History: NextPage = () => {
  return (
    <div className="app-bg">
      <AppNavigation />
      <h1 className="uppercase text-4xl font-light text-light-green w-11/12 text-left">History</h1>
      <Toolbar className="w-11/12" />
      <Tab.Group as="div" className={'grow overflow-hidden bg-light-green rounded-lg w-11/12'}>
        <Tab.List as="div" className={'h-12 w-full text-lg flex'}>
          <Tab className={({ selected }) => `basis-1/2 transition-all ${selected ? '' : 'bg-whiskey text-white'}`}>
            Table
          </Tab>
          <Tab className={({ selected }) => `basis-1/2 transition-all ${selected ? '' : 'bg-whiskey text-white'}`}>
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
