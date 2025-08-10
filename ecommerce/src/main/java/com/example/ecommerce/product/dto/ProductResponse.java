package com.example.ecommerce.product.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ProductResponse(
        Long id,
        String sku,
        String name,
        String description,
        String category,
        BigDecimal price,
        Integer stock,
        List<String> imageUrls,
        Instant createdAt,
        Instant updatedAt
) {}