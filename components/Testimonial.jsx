import Image from 'next/image';
import React from 'react';
import client1 from '../public/client.jpg';
import client2 from '../public/client2.jpg';
import client3 from '../public/client3.jpg';

const Testimonial = () => {
  return (
    <div className="p-8">
      <div className="w-full gap-4 container mb-8 mt-8 lg:flex mx-auto  ">
        <div className="mb-4 lg:mb-0  shadow-sm shadow-slate-400 flex mx-4 overflow-hidden bg-slate-50 p-8 hover:shadow-md">
          <div>
            <Image
              src={client1}
              alt={client1}
              width={200}
              height={200}
              className="rounded-full object-cover object-top border border-red-6000"
            />
          </div>
          <div className="ml-3 overflow-hidden py-3">
            <blockquote className="relative inline-block text-gray-700 pb-8 before:block  before:absolute before:content-['\201C'] before:text-3xl before:-top-4 before:-left-0 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              delectus cum numquam sunt magni quis nobis. Illum illo ipsum nam
              nemo,
            </blockquote>
            <span className="capitalize text-lg text-slate-900">
              Andy keneth
            </span>
            <h3 className="text-sm text-slate-500">CEO Andy Group</h3>
          </div>
        </div>
        <div className=" mb-4  lg:mb-0 flex shadow-sm shadow-slate-400  mx-4 overflow-hidden bg-slate-50 p-8 hover:shadow-md">
          <div>
            <Image
              src={client2}
              alt={client1}
              width={200}
              height={200}
              className="rounded-full object-cover object-top border border-red-6000"
            />
          </div>
          <div className="ml-3 overflow-hidden py-3">
            <blockquote className="relative inline-block text-gray-700 pb-8 before:block  before:absolute before:content-['\201C'] before:text-3xl before:-top-4 before:-left-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              delectus cum numquam sunt magni quis nobis. Illum illo ipsum nam
              nemo,
            </blockquote>
            <span className="capitalize text-lg text-slate-900">
              Andy keneth
            </span>
            <h3 className="text-sm text-slate-500">CEO Andy Group</h3>
          </div>
        </div>
        <div className="flex shadow-sm shadow-slate-400 mx-4 overflow-hidden bg-slate-50 p-8 hover:shadow-md">
          <div>
            <Image
              src={client3}
              alt={client1}
              width={200}
              height={200}
              className="rounded-full object-cover object-top border border-red-6000"
            />
          </div>
          <div className="ml-3 overflow-hidden py-3">
            <blockquote className="relative inline-block text-gray-700 pb-8 before:block  before:absolute before:content-['\201C'] before:text-3xl before:-top-4 before:-left-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              delectus cum numquam sunt magni quis nobis. Illum illo ipsum nam
              nemo
            </blockquote>
            <span className="capitalize text-lg text-slate-900">
              Andy keneth
            </span>
            <h3 className="text-sm text-slate-500">CEO Andy Group</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
