import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchedQuery } from "@/store/atoms/jobs";
const category = [
  "FullStack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Data Science",
  "AI Engineer"
];
const CategoryCarousel = () => {
  const [searchQuery,setSearchQuery]  = useRecoilState(searchedQuery);
  const navigate = useNavigate();
  const searchJobHandler = (query)=>{
      setSearchQuery(query);
      navigate("/browse")
  }
  return (
    <div className="">
        <Carousel className="w-full max-w-xl mx-auto my-20">
          <CarouselContent>
            {category.map((items, index) =>( 
            <CarouselItem key={items} className="md:basis-1/2 lg:basis-1/3"> 
              <Button onClick={()=>searchJobHandler(items)} variant="outline" className="rounded-full">{items}</Button>
            </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
    </div>
  );
};

export default CategoryCarousel;
