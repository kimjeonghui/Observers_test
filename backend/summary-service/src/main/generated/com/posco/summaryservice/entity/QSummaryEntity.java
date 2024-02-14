package com.posco.summaryservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSummaryEntity is a Querydsl query type for SummaryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSummaryEntity extends EntityPathBase<SummaryEntity> {

    private static final long serialVersionUID = -1505584350L;

    public static final QSummaryEntity summaryEntity = new QSummaryEntity("summaryEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath description = createString("description");

    public final StringPath email = createString("email");

    public final DateTimePath<java.time.LocalDateTime> endDate = createDateTime("endDate", java.time.LocalDateTime.class);

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath name = createString("name");

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath password = createString("password");

    public final StringPath refreshToken = createString("refreshToken");

    public final StringPath role = createString("role");

    public final DateTimePath<java.time.LocalDateTime> startDate = createDateTime("startDate", java.time.LocalDateTime.class);

    public QSummaryEntity(String variable) {
        super(SummaryEntity.class, forVariable(variable));
    }

    public QSummaryEntity(Path<? extends SummaryEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSummaryEntity(PathMetadata metadata) {
        super(SummaryEntity.class, metadata);
    }

}

