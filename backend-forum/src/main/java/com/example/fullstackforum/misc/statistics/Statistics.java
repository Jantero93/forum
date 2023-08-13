package com.example.fullstackforum.misc.statistics;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "statistics")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Statistics {

    @Id
    @GeneratedValue
    private Long id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date visitedTime;

    private String sessionId;

    private String ipAddress;

    private String username;

    private String path;
}
