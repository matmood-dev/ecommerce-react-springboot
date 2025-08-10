package com.example.ecommerce.product.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(
        @NotBlank @Size(max = 64) String sku,
        @NotBlank @Size(max = 200) String name,
        String description,
        @Size(max = 100) String category,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @NotNull @Min(0) Integer stock,
        List<@NotBlank String> imageUrls
) {}