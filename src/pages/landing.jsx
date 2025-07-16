import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import companies from "@/data/companies.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import faqs from "@/data/faqs.json"
const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-20">
        <section className="text-center">
          <h1 className="flex items-center justify-center flex-col gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
            Find Your Dream Job{" "}
            <span className="flex items-center gap-2 sm:gap-6">
              and get{" "}
              <img
                src="./logo.png"
                alt="Hirrd logo"
                className=" h-14 sm:h-24 lg:h-32"
              />
            </span>
          </h1>
          <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
            Explore thousands of job listings or find the perfect candidate
          </p>
        </section>
        <div className="flex gap-6 justify-center items-center">
          <NavLink to="/jobs">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </NavLink>

          <NavLink to="/post-job">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </NavLink>
        </div>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ id, name, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <img src="/banner.jpeg" className="w-full " />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card >
            <CardHeader>
              <CardTitle className="font-bold"> For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              Search and apply for jobs, track applications, and more
            </CardContent>
          </Card>

          <Card >
            <CardHeader>
              <CardTitle className="font-bold">For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>

        <Accordion type="single" collapsible>
        {faqs.map(({question, answer},idx)=>{
          return(
            <AccordionItem key = {idx} value={`item-${idx+1}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              {answer}
            </AccordionContent>
          </AccordionItem>);
        })}
          
        </Accordion>

        
      </main>
    </>
  );
};

export default LandingPage;
