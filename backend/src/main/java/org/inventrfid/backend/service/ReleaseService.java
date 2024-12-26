package org.inventrfid.backend.service;

import org.inventrfid.backend.dto.ReleaseDTO;
import org.inventrfid.backend.entity.Release;
import org.inventrfid.backend.entity.Stock;
import org.inventrfid.backend.repository.ReleaseRepository;
import org.inventrfid.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReleaseService {


    @Autowired
    private final ReleaseRepository releaseRepository;
    @Autowired
    private final StockRepository stockRepository;

    public ReleaseService(ReleaseRepository releaseRepository, StockRepository stockRepository) {
        this.releaseRepository = releaseRepository;
        this.stockRepository = stockRepository;
    }

    public Release createRelease(String rfid) {
        Stock stock = stockRepository.findByRfid(rfid);
        Release release = new Release();
        release.setStock(stock);
        return releaseRepository.save(release);
    }

    public Release updateRelease(Long transactionId, int releaseQuantity, BigDecimal releasePrice) {
        Release release = releaseRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Release not found with Transaction ID: " + transactionId));
        release.setReleaseQuantity(releaseQuantity);
        release.setReleasePrice(releasePrice);
        release.setTimestamp(new Date());
        return releaseRepository.save(release);
    }

    public List<ReleaseDTO> getAll() {
        List<Release> releases = releaseRepository.findAll();
        return releases.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public Optional<Release> getById(Long id) {
        return Optional.ofNullable(releaseRepository.findByTransactionId(id));
    }

    public void deleteRelease(Long id) {
        Release release = releaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Release not found with ID: " + id));
        releaseRepository.delete(release);
    }

    public ReleaseDTO mapToDto(Release release) {
        ReleaseDTO dto = new ReleaseDTO();
        dto.setTransactionId(release.getTransactionId());
        dto.setReleaseQuantity(release.getReleaseQuantity());
        dto.setReleasePrice(release.getReleasePrice());
        dto.setTimestamp(release.getTimestamp());
        dto.setRfid(release.getStock() != null ? release.getStock().getRfid() : null);
        return dto;
    }

    public Release mapToEntity(ReleaseDTO dto) {
        Release release = new Release();
        release.setTransactionId(dto.getTransactionId());
        release.setReleaseQuantity(dto.getReleaseQuantity());
        release.setTimestamp(dto.getTimestamp());
        release.setReleasePrice(dto.getReleasePrice());
        if (dto.getRfid() != null) {
            Stock stock = stockRepository.findById(dto.getRfid())
                    .orElseThrow(() -> new RuntimeException("Stock not found with ID: " + dto.getRfid()));
            release.setStock(stock);
        }
        return release;
    }
}


