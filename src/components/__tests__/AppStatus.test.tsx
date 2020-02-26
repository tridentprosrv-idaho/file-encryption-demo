import React from "react";
import { shallow } from 'enzyme';
import AppStatus from "../AppStatus";
import AppStatusEnum from "../AppStatusEnum";
import Fail from "../fail";
import Loading from "../loading";
import Success from "../success";

describe("AppStatus", () => {
  it("AppStatus Renders fail on error", () => {

    const wrapper = shallow(<AppStatus status={AppStatusEnum.Error} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Fail />)).toBe(true);
  });
  it("AppStatus Renders loading in loading status", () => {

    const wrapper = shallow(<AppStatus status={AppStatusEnum.Loading} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Loading />)).toBe(true);
  });
  it("AppStatus Renders success in success status", () => {

    const wrapper = shallow(<AppStatus status={AppStatusEnum.Success} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Success />)).toBe(true);
  });

  it("AppStatus Renders form in initial status", () => {

    const wrapper = shallow(<AppStatus status={AppStatusEnum.Initial} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.find("form")).toHaveLength(1);
  });
});
