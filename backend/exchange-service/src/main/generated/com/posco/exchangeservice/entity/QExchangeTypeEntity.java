package com.posco.exchangeservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExchangeTypeEntity is a Querydsl query type for ExchangeTypeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExchangeTypeEntity extends EntityPathBase<ExchangeTypeEntity> {

    private static final long serialVersionUID = -1239376524L;

    public static final QExchangeTypeEntity exchangeTypeEntity = new QExchangeTypeEntity("exchangeTypeEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final StringPath lastUpdatedBy = _super.lastUpdatedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final StringPath rateType = createString("rateType");

    public QExchangeTypeEntity(String variable) {
        super(ExchangeTypeEntity.class, forVariable(variable));
    }

    public QExchangeTypeEntity(Path<? extends ExchangeTypeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExchangeTypeEntity(PathMetadata metadata) {
        super(ExchangeTypeEntity.class, metadata);
    }

}

