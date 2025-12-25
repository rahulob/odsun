import Navbar from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExplainationTab from "./components/explaination-tab";

export default function page() {
  return (
    <div>
      <Navbar />
      <Tabs defaultValue="account" className="p-2">
        <TabsList>
          <TabsTrigger value="account">Describe</TabsTrigger>
          <TabsTrigger value="password">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ExplainationTab />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
