package com.posco.summaryservice.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInvoiceDataEntity is a Querydsl query type for InvoiceDataEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInvoiceDataEntity extends EntityPathBase<InvoiceDataEntity> {

    private static final long serialVersionUID = -982321485L;

    public static final QInvoiceDataEntity invoiceDataEntity = new QInvoiceDataEntity("invoiceDataEntity");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final StringPath createdBy = _super.createdBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath depCurr = createString("depCurr");

    public final NumberPath<java.math.BigDecimal> deposit = createNumber("deposit", java.math.BigDecimal.class);

    public final StringPath description = createString("description");

    public final ListPath<EvidenceDataEntity, QEvidenceDataEntity> evidenceDataEntityList = this.<EvidenceDataEntity, QEvidenceDataEntity>createList("evidenceDataEntityList", EvidenceDataEntity.class, QEvidenceDataEntity.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> fiscalMonth = createDateTime("fiscalMonth", java.time.LocalDateTime.class);

    public final NumberPath<Long> invoiceDataId = createNumber("invoiceDataId", Long.class);

    //inherited
    public final StringPath lastModifiedBy = _super.lastModifiedBy;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastUpdatedDate = _super.lastUpdatedDate;

    public final NumberPath<Long> ocrId = createNumber("ocrId", Long.class);

    public final StringPath ovsCd = createString("ovsCd");

    public final StringPath status = createString("status");

    public final StringPath store = createString("store");

    public final StringPath tranCd = createString("tranCd");

    public final NumberPath<java.math.BigDecimal> transAmount = createNumber("transAmount", java.math.BigDecimal.class);

    public final DateTimePath<java.time.LocalDateTime> txDate = createDateTime("txDate", java.time.LocalDateTime.class);

    public final StringPath wdCurr = createString("wdCurr");

    public final NumberPath<java.math.BigDecimal> withdrawal = createNumber("withdrawal", java.math.BigDecimal.class);

    public QInvoiceDataEntity(String variable) {
        super(InvoiceDataEntity.class, forVariable(variable));
    }

    public QInvoiceDataEntity(Path<? extends InvoiceDataEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInvoiceDataEntity(PathMetadata metadata) {
        super(InvoiceDataEntity.class, metadata);
    }

}

