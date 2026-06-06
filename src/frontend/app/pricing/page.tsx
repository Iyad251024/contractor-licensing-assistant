import { PricingTable } from "../../components/PricingTable";

export default function PricingPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1" style={{ fontSize: 40 }}>Pricing</h1>
        <p className="lead">Cancel anytime. One month replaces a single consultant invoice.</p>
        <div style={{ marginTop: 32 }}>
          <PricingTable />
        </div>
      </div>
    </section>
  );
}
