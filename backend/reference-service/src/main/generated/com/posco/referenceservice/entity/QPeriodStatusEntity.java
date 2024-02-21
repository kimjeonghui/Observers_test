package com.posco.referenceservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPeriodStatusEntity is a Querydsl query type for PeriodStatusEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPeriodStatusEntity extends EntityPathBase<PeriodStatusEntity> {

    private static final long serialVersionUID = -159306568L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPeriodStatusEntity periodStatusEntity = new QPeriodStatusEntity("periodStatusEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<java.math.BigDecimal> endingBalanceLoc1 = createNumber("endingBalanceLoc1", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> endingBalanceLoc2 = createNumber("endingBalanceLoc2", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> endingBalanceRc1 = createNumber("endingBalanceRc1", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> endingBalanceRc2 = createNumber("endingBalanceRc2", java.math.BigDecimal.class);

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath periodName = createString("periodName");

    public final NumberPath<Long> periodStatusId = createNumber("periodStatusId", Long.class);

    public final QReferenceEntity referenceEntity;

    public final StringPath status = createString("status");

    public QPeriodStatusEntity(String variable) {
        this(PeriodStatusEntity.class, forVariable(variable), INITS);
    }

    public QPeriodStatusEntity(Path<? extends PeriodStatusEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPeriodStatusEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPeriodStatusEntity(PathMetadata metadata, PathInits inits) {
        this(PeriodStatusEntity.class, metadata, inits);
    }

    public QPeriodStatusEntity(Class<? extends PeriodStatusEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.referenceEntity = inits.isInitialized("referenceEntity") ? new QReferenceEntity(forProperty("referenceEntity")) : null;
    }

}

