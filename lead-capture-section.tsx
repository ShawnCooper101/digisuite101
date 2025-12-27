import { DigiMarkLeadForm, BusinessLoanLeadForm, SurvivalBookstoreLeadForm } from "@/components/lead-capture-forms"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LeadCaptureSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-muted-foreground">
            Choose the service that fits your needs and let Ava help you succeed
          </p>
        </div>

        <Tabs defaultValue="digimark" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="digimark">Marketing Services</TabsTrigger>
            <TabsTrigger value="loans">Business Loans</TabsTrigger>
            <TabsTrigger value="survival">Survival Books</TabsTrigger>
          </TabsList>

          <TabsContent value="digimark" className="mt-6">
            <DigiMarkLeadForm />
          </TabsContent>

          <TabsContent value="loans" className="mt-6">
            <BusinessLoanLeadForm />
          </TabsContent>

          <TabsContent value="survival" className="mt-6">
            <SurvivalBookstoreLeadForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}