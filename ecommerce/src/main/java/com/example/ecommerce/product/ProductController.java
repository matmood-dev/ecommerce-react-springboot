package com.example.ecommerce.product;

import com.example.ecommerce.product.dto.ProductRequest;
import com.example.ecommerce.product.dto.ProductResponse;
import jakarta.validation.Valid;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    @PostMapping
    public ProductResponse create(@Valid @RequestBody ProductRequest req) {
        return service.create(req);
    }

    @GetMapping("/{id}")
    public ProductResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    // /api/products?q=phone&category=mobiles&minPrice=100&maxPrice=1000&sort=price,asc&page=0&size=10
    @GetMapping
    public Page<ProductResponse> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort
    ) {
        Sort s = Sort.by(sort.split(",")[0]);
        if (sort.toLowerCase().endsWith(",asc")) s = s.ascending(); else s = s.descending();
        Pageable pageable = PageRequest.of(page, size, s);
        return service.list(q, category, minPrice, maxPrice, pageable);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}