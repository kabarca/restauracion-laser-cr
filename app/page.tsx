import { Hero } from "@/components/home/Hero";
import { MachinesForSale } from "@/components/home/MachinesForSale";
import { StatsBar } from "@/components/home/StatsBar";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesTeaser } from "@/components/home/ServicesTeaser";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FranchiseTeaser } from "@/components/home/FranchiseTeaser";
import { FRANCHISES_ENABLED } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <MachinesForSale />
      <ValueProps />
      <ServicesTeaser />
      <HowItWorks />
      {FRANCHISES_ENABLED && <FranchiseTeaser />}
    </>
  );
}
