import React from "react";
import { shallow } from 'enzyme';
import UploadComponent from "../UploadComponent";
import AppStatusEnum from "../AppStatusEnum";
import Fail from "../fail";
import Loading from "../loading";
import Success from "../success";

describe("UploadComponent", () => {
  it("UploadComponent Renders fail on error", () => {

    const wrapper = shallow(<UploadComponent status={AppStatusEnum.Error} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Fail />)).toBe(true);
  });
  it("UploadComponent Renders loading in loading status", () => {

    const wrapper = shallow(<UploadComponent status={AppStatusEnum.Loading} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Loading />)).toBe(true);
  });
  it("UploadComponent Renders success in success status", () => {

    const wrapper = shallow(<UploadComponent status={AppStatusEnum.Success} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.contains(<Success />)).toBe(true);
  });

  it("UploadComponent Renders form in initial status", () => {

    const wrapper = shallow(<UploadComponent status={AppStatusEnum.Initial} statusClassName={""} statusMessage={""} submitHandler={()=>{}} />);
    expect(wrapper.find("form")).toHaveLength(1);
  });
});
