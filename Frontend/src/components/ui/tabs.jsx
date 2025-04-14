export function Tabs({ children }) {
    return <div>{children}</div>;
  }
  
  export function TabsList({ children }) {
    return <div className="flex space-x-2">{children}</div>;
  }
  
  export function TabsTrigger({ children, value }) {
    return <button className="p-2 border-b-2">{children}</button>;
  }
  
  export function TabsContent({ children, value }) {
    return <div className="p-4">{children}</div>;
  }
  