import React from "react";
import { FaRegStar } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Price = ({ memberships, BUY_CRADIT }) => {
  return (
    <div class="content-page">
      <div class="container-fluid">
        <div class="row">
          <div class="pricing-custom-tab w-100">
            <div class="pricing-content">
              <div class="tab-pane fade active show">
                <div class="row m-0">
                  {memberships?.map((plan, index) => (
                    <div key={plan?.plan} class="col-lg-4 col-sm-6">
                      <div class="card card-block card-stretch card-height blog pricing-details">
                        <div class="card-body border text-center rounded">
                          <div
                            class={`pricing-header ${
                              index == 0
                                ? "bg-primary"
                                : index == 1
                                ? "bg-success"
                                : "bg-danger"
                            }  text-white`}
                          >
                            <div class="icon-data">
                              <i class="">
                                <FaRegStar />
                              </i>
                            </div>
                            <h2 class="mb-4 display-5 font-weight-bolder text-white">
                              {plan?.price}
                              <small class="font-size-14">
                                / {plan?.plan} MATIC
                              </small>
                            </h2>
                          </div>
                          <h4 class="mb-3">
                            {index == 0
                              ? "20 Cradit"
                              : index == 1
                              ? "50 Cradit"
                              : "100 Cradit"}
                          </h4>
                          <ul class="list-unstyled mb-0 pricing-list">
                            {plan.subscription.features.map(
                              (feature, index) => (
                                <li>
                                  <i
                                    key={index}
                                    class="lar  text-primary mr-2 font-size-20"
                                  >
                                    <TiTick />
                                  </i>
                                  {feature}
                                </li>
                              )
                            )}
                          </ul>{" "}
                          <a
                            onClick={() => BUY_CRADIT(plan)}
                            class="btn btn-primary mt-5 text-white"
                          >
                            Get {plan?.plan}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
