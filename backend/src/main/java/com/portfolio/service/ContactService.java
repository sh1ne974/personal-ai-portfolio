package com.portfolio.service;

import com.portfolio.dto.ContactRequest;
import com.portfolio.entity.Contact;
import com.portfolio.mapper.ContactMapper;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMapper contactMapper;

    public ContactService(ContactMapper contactMapper) {
        this.contactMapper = contactMapper;
    }

    public void submit(ContactRequest req) {
        Contact contact = new Contact();
        contact.setName(req.getName().trim());
        contact.setEmail(req.getEmail().trim());
        contact.setPhone(req.getPhone() != null ? req.getPhone().trim() : "");
        contact.setMessage(req.getMessage().trim());
        contactMapper.insert(contact);
    }
}
