package com.team_damda.domain.controller;

import com.team_damda.domain.dto.CategoryDto;
import com.team_damda.domain.entity.ClassReservation;
import com.team_damda.domain.entity.OrderDetail;
import com.team_damda.domain.repository.OrderDetailRepository;
import com.team_damda.domain.service.ClassReservationService;
import com.team_damda.domain.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/OrderDetail")
public class OrderDetailController {

        @Autowired
        private OrderDetailService orderDetailService;
        @Autowired
        private ClassReservationService classReservationService;

        // 예약목록
        @GetMapping("/listreservation")
        public String list(@PageableDefault Pageable pageable, Model model) {
                model.addAttribute("orderDetailList", orderDetailService.getOrderDetailList(pageable));
                return "/listreservation"; // 수정 필요, react 작업해보고 정하기
        }

        // 예약삭제
        @DeleteMapping("/orderDetails/{id}")
        public ResponseEntity<?> deleteOrderDetail(@PathVariable("id") Long id) {
                try {
                        orderDetailService.deleteOrderDetail(id); // OrderDetailService로 이동
                        return ResponseEntity.ok().build();
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete order detail");
                }
        }

        // 예약수정 양식
        @GetMapping({"", "/"})
        public String OrderDetail(@RequestParam(value = "id", defaultValue = "0") Long id, Model model) {
                model.addAttribute("orderDetail", orderDetailService.getOrderDetailByClassReservationId(id));
                return "/OrderDetail/update";
        }
        /*에약수정*/
        @PutMapping("/modify-userinformation")
        public OrderDetail updateOrderDetail(@PathVariable Long orderDetailId, @RequestBody OrderDetail updatedOrderDetail) {
                return orderDetailService.updateOrderDetail(orderDetailId, updatedOrderDetail);
        }

}



/* orderdetail에 들어갈 부분이 아닌 것 같음
        //예약수정
        @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
        public ResponseEntity<?> putOrderDetail(@PathVariable("id") Long id, @RequestBody OrderDetail orderDetail) {
                Optional<OrderDetail> optionalOrderDetail = OrderDetailRepository.findById(id);
                if (optionalOrderDetail.isPresent()) {
                        OrderDetail updateOrderDetail = optionalOrdetDetail.get();
                        updateOrderDetail.setClassName(orderDetail.getClassName());
                        updateOrderDetail.setReservationDate(orderDetail.getReservationDate());
                        orderDetailRepository.save(updateOrderDetail);

                        return ResponseEntity.ok().build();
                } else {
                        return ResponseEntity.notFound().build();
                }
        }
*/




