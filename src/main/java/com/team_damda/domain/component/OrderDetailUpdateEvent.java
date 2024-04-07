package com.team_damda.domain.component;
import org.springframework.context.ApplicationEvent;

    public class OrderDetailUpdateEvent extends ApplicationEvent {
        public OrderDetailUpdateEvent(Object source) {
            super(source);
        }
    }

