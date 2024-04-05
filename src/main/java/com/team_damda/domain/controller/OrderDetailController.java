package com.team_damda.domain.controller;

import com.team_damda.domain.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OrderDetailController {

        @Autowired
        private OrderDetailService orderdetailService;

        /*리액트 사용하면 필요하지 않은 것 같음
        @GetMapping( "/")
        public String OrderDetailList(){

                return "OrderDetailList";

        }

        @GetMapping("/order-details/{classReservationId}")
@ResponseBody
public List<OrderDetail> getOrderDetailsByClassReservationId(@PathVariable Long classReservationId) {
    return orderDetailService.getOrderDetailsByClassReservationId(classReservationId);
}

        */


}
