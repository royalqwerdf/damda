//package com.team_damda;
//
//import com.team_damda.domain.controller.CartController;
//import com.team_damda.domain.dto.CartDto;
//import com.team_damda.domain.entity.Cart;
//import com.team_damda.domain.entity.ClassTime;
//import com.team_damda.domain.entity.Member;
//import com.team_damda.domain.repository.CartRepository;
//import com.team_damda.domain.repository.ClassTimeRepository;
//import com.team_damda.domain.repository.MemberRepository;
//import com.team_damda.domain.service.CartService;
//import jakarta.servlet.http.HttpSession;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.*;
//
//public class CartControllerTest {
//
//    @InjectMocks
//    private CartController cartController;
//
//    @Mock
//    private CartService cartService;
//
//    @Mock
//    private ClassTimeRepository classTimeRepository;
//
//    @Mock
//    private MemberRepository memberRepository;
//
//    @Mock
//    private CartRepository cartRepository;
//
//    @Mock
//    private HttpSession session;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testAddCart() {
//        Long classTimeId = 1L;
//        CartDto cartDto = new CartDto();
//
//        ClassTime classTime = new ClassTime();
//        Member member = new Member();
//        Cart cart = new Cart();
//
//        when(classTimeRepository.findById(classTimeId)).thenReturn(java.util.Optional.of(classTime));
//        when(memberRepository.findById(anyLong())).thenReturn(java.util.Optional.of(member));
//        when(cartService.save(any())).thenReturn(cart);
//
//        ResponseEntity<Cart> responseEntity = cartController.addCart(classTimeId, cartDto, null, null, null);
//
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(cart, responseEntity.getBody());
//    }
//
//    @Test
//    public void testGetAllCarts() {
//        // Add your test cases for getAllCarts method here
//    }
//
//    @Test
//    public void testDeleteCart() {
//        // Add your test cases for deleteCart method here
//    }
//
//    @Test
//    public void testUpdateCart() {
//        // Add your test cases for updateCart method here
//    }
//
//    @Test
//    public void testIsCartEmpty() {
//        // Add your test cases for isCartEmpty method here
//    }
//
//    @Test
//    public void testCountCarts() {
//        // Add your test cases for countCarts method here
//    }
//}
